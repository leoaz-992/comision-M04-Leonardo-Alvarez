// eslint-disable-next-line react/prop-types
export function Message({ message }) {
  return (
    <p className="alert alert-danger alert-dismissible fade show">
      {message}
    </p>
  );
}