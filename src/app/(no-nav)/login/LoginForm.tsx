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
    <form
      action={handleSubmit}
      className="relative -top-10 flex h-[120%] w-full flex-col items-center rounded-xl bg-white shadow-2xl shadow-gray-700"
    >
      <div className="m-7 flex w-5/6 items-center justify-between">
        <h2 className="font-black text-red-600">Marketplace</h2>
        <h2 className="text-2xl font-semibold text-slate-700">University</h2>
      </div>
      <h1 className="text-2xl font-bold">Login to your account</h1>
      <div className="m-5 h-16 w-5/6">
        <input
          required
          type="text"
          name="username"
          placeholder="Write your user-name*"
          className=" m-auto size-full rounded-t-lg border-b border-b-gray-400 bg-gray-200 outline-none duration-200 placeholder:items-center placeholder:pl-5 placeholder:font-semibold placeholder:text-gray-500 hover:bg-gray-300 hover:ease-in-out"
        />
        <p className="m-1 text-xs text-gray-500">*Required field</p>
      </div>
      <div className="m-5 h-16 w-5/6">
        <input
          required
          type="password"
          name="password"
          placeholder="Password"
          className="m-auto size-full rounded-t-lg border-b border-b-gray-400 bg-gray-200 outline-none duration-200 placeholder:items-center placeholder:pl-5 placeholder:font-semibold placeholder:text-gray-500 hover:bg-gray-300 hover:ease-in-out"
        />
        <p className="m-1 text-xs text-gray-500">*Required field</p>
      </div>
      <p className="mt-5 w-5/6 text-sm">
        Marketplace does not works in partnership with anybody. You need an
        account to continue. You can use the same account details on all
        websites, so it will be easier for us
      </p>
      <button
        type="submit"
        className="absolute bottom-10 h-10 w-5/6 rounded bg-blue-500 font-semibold text-white duration-200 hover:bg-blue-600 hover:drop-shadow-xl hover:ease-in-out"
      >
        Login
      </button>
    </form>
  );
}
