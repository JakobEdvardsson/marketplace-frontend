"use client";

export default function LoginForm() {
  const handleSubmit = async (formData: FormData) => {
    const username = formData.get("username");
    const password = formData.get("password");
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
