function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB"];

  // Determine the index
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${(bytes / k ** i).toFixed(2)} ${sizes[i]}`;
}

console.log(formatFileSize(112312312));
