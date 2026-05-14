interface Props {
  code: string;
}

export const VerificationUserTemplate = ({ code }: Props) => {

  const domain = process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : process.env.NEXT_PUBLIC_URL || "http://localhost:3000";
    
  return (
    <div>
      <p>
        Код подтверждения: <b>{code}</b>
      </p>

      <p>
        <a href={`${domain}/api/auth/verify?code=${code}`}>
          Подтвердить регистрацию
        </a>
      </p>
    </div>
  );
};
