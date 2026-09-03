import { useAuth } from "@clerk/react";

export default function GetToken() {
  const { getToken } = useAuth();

  const handleGetToken = async () => {
    const token = await getToken();
    console.log(token);
  };

  return <button onClick={handleGetToken}>Get Clerk Token</button>;
}
