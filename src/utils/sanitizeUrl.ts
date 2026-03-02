/**
 * Utility to sanitize image URLs from the WordPress host.
 * Forces HTTP for the EC2 hostname since it doesn't have SSL configured.
 */
export function sanitizeImageUrl(url: string | null | undefined): string {
  if (!url) return "http://ec2-18-213-34-154.compute-1.amazonaws.com/wp-content/uploads/2024/09/efootball.jpg";

  // If it's the EC2 hostname, force http
  if (url.includes("ec2-18-213-34-154.compute-1.amazonaws.com")) {
    return url.replace("https://", "http://");
  }

  return url;
}
