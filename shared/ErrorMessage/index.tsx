type ErrorMessageProps = {
  message: string | undefined;
};

export function ErrorMessage(props: ErrorMessageProps) {
  return <p className="text-red-600 mt-4">{props.message}</p>;
}
