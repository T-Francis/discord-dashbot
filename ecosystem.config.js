module.exports = {
    apps: [
      {
        name: "discord-dashbot",
        exec_mode: "fork",
        script: "npm run dev",
        autorestart: false,
        cwd: "./",
        env: {
            NODE_ENV: "development",
        },
      },
    ],
  };
  