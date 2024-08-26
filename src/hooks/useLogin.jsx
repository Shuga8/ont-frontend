export const useLogin = () => {
  const login = async (email, password) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const data = JSON.stringify({ email, password });

    const loginUser = await fetch("/v1/auth/login", {
      method: "POST",
      headers: myHeaders,
      body: data,
    });
    const response = await loginUser.json();

    console.log(response);
  };

  return { login };
};
