const serverRunning = (port) => {
  console.log(
    `\x1b[36m%s\x1b[0m`,
    `🚀 Server is now flying on port ${port}! 🌐✨`
  );
  console.log(
    `\x1b[36m%s\x1b[0m`,
    `🔗 Access the app at: http://localhost:${port} 🖥️✨`
  );
  console.log(
    `🔗 Access the API documentation at: http://localhost:${port}/api-docs 📖✨`
  );
};

const dbConnected = () => {
  console.log(
    "\x1b[32m%s\x1b[0m",
    "✅ Successfully connected to the database! 🌟"
  ); // Green success message with a star
};

const dbConnectionFailed = (error) => {
  console.log(
    "\x1b[31m%s\x1b[0m",
    `❌ Database connection failed: ${error.message} 🚨`
  ); // Red error message with a warning emoji
};

// Export the functions
export { serverRunning, dbConnected, dbConnectionFailed };
