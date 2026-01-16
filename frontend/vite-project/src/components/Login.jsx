import { Button, Checkbox, Label, TextInput } from "flowbite-react";

function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121226] px-4">

      <div
        className="
          w-full
          max-w-2xl
          bg-[#121226]
          rounded-2xl
          overflow-hidden
          shadow-xl
          flex flex-col md:flex-row
          h-80vh md:h-[80vh]
          items-center
          mt-12
        "
      >
    
        <div className="w-full md:w-1/2 h-56 md:h-full">
          <img
            src="https://res.cloudinary.com/dddrnrk49/image/upload/v1768143788/a%C5%9Fk_aooo1c.gif"
            alt="login animation"
            className="w-full h-full object-cover"
          />
        </div>
        <div
          className="
            w-3/4 md:w-1/2
            p-6 md:p-10
            flex flex-col
            justify-center
            overflow-y-auto no-scrollbar
          "
        >
          <h2 className="text-2xl font-bold text-white mb-6">
            Welcome back
          </h2>

          <form
            className="dark flex flex-col gap-4"
            action="/auth/login"
            method="post"
          >
            <div>
              <Label htmlFor="email" className="text-white">
                Your email
              </Label>
              <TextInput
                id="email"
                type="email"
                name="email"
                placeholder="name@gmail.com"
                required
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-white">
                Password
              </Label>
              <TextInput
                id="password"
                type="password"
                name="password"
                required
              />
            </div>

            <div className="flex items-center gap-2">
              <Checkbox id="remember" />
              <Label htmlFor="remember" className="text-gray-300">
                Remember me
              </Label>
            </div>

            <Button
              type="submit"
              className="bg-[#6b3df5] hover:bg-[#5a2ee0]"
            >
              Login
            </Button>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-[#a1a1c2]">
              Don’t have an account?{" "}
              <a
                href="/"
                className="text-[#6b3df5] hover:text-[#5a2ee0] font-medium transition-colors"
              >
                Create one
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
