export function ProductImage({ imageUrl, name }: { imageUrl: string; name: string }) {
  return (
    <img
      src={imageUrl}
      alt={name}
      className="w-64 h-64 object-cover rounded-md self-center"
    />
  );
}