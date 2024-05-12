"use client";

export default function LoginForm() {
  const handleSubmit = async (formData: FormData) => {
    //TODO: delete undrelines after joining with db
    const _username = formData.get("username");
    const _password = formData.get("password");
    //TODO: uncomment this line after implementing login function
    // await login(username, password).then(res => {...});
  };

  return (
    <form action={handleSubmit}>
      <input required type="text" name="username" placeholder="Username" />
      <input required type="password" name="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
}
