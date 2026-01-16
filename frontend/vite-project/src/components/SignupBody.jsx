import { Button, Checkbox, Label, TextInput } from "flowbite-react";

function SignupBody() {
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
            alt="animation"
            className="w-full h-full object-cover"
          />
        </div>
        <div
          className="
            w-3/4  md:w-1/2
            p-6 md:p-10
            flex flex-col
             justify-center
            overflow-y-auto no-scrollbar
          "
        >
          <h2 className="text-2xl font-bold text-white mb-6">
            Create your account
          </h2>

          <form className=" dark flex flex-col gap-4" action="/auth/signup" method="post">
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
                minLength={6}
                required
              />
            </div>

            <div>
              <Label htmlFor="cpassword" className="text-white">
                Confirm password
              </Label>
              <TextInput
                id="cpassword"
                type="password"
                name="cpassword"
                minLength={6}
                required
              />
            </div>

            <div className="flex items-center gap-2">
<div className="mt-6 text-center">
  <p className="text-sm text-[#a1a1c2]">
    Already have an account?{" "}
    <a
      href="/login"
      className="text-[#6b3df5] hover:text-[#5a2ee0] font-medium transition-colors"
    >
      Login
    </a>
  </p>
</div>

            </div>

            <Button
              type="submit"
              className="bg-[#6b3df5] hover:bg-[#5a2ee0]"
            >
              Register
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupBody;
