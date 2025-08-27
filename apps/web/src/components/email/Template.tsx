type ContactProps = {
  name: string;
  message: string;
};

export const Contact = ({ name, message }: ContactProps) => {
  return (
    <div>
      <h1>Website Message from {name}</h1>

      <p>{message}</p>
    </div>
  );
};
