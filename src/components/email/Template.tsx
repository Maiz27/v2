type ContactProps = {
  name: string;
  email: string;
  message: string;
};

export const Contact = ({ name, email, message }: ContactProps) => {
  return (
    <div>
      <h1>Website Message from {name}</h1>

      <p>{message}</p>
    </div>
  );
};
