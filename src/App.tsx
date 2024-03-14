import { Check, CircleNotch, Eye, EyeSlash } from "@phosphor-icons/react";
import { Label } from "@radix-ui/react-label";
import { useState } from "react";
import Logo from "./assets/git.svg";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@radix-ui/react-separator";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";
import { z } from "zod";


const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  })
})

type LoginSchema = z.infer<typeof loginSchema>

export function App() {
  const { register, handleSubmit } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema)
  })
  const [viewPassword, setViewPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  async function getLoginData(data: LoginSchema) {
    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 1500))

    const { email, password } = data
    toast("Login realizado com sucesso", {
      description: 
        <p>Seus dados: <br/> email: {email} <br/> senha: {password} </p>
      ,
      icon: <Check />,
      action: {
        label: "Fechar",
        onClick: () => { return }
      }

    })
    return setIsLoading(false)
  }

  return (
    <main className="w-full h-dvh grid px-4 font-poppins place-content-center">
      <form onSubmit={handleSubmit(getLoginData)} className="border shadow-md p-4 space-y-4 rounded-lg animate-fadeIn">
        <header>
          <h1 className="font-poppins">
            Entre com sua conta
          </h1>
          <p className="text-sm text-zinc-400 font-poppins">
            Utilize seu email e senha ou entre com o GitHub
          </p>
        </header>
     
        <div>
          <Label className="font-semibold text-sm" htmlFor="email">
            E-mail
          </Label>
          <Input required
            type="email"
            {...register('email')} id="email"
            placeholder="example@gmail.com" />
        </div>

        <div>
          <Label className="font-semibold text-sm" htmlFor="">
            Senha
          </Label>
          <div className="relative flex items-center">
            <Input required
              id="password"
              {...register('password')}
              type={!viewPassword ? 'password' : 'text'}
              placeholder="Senha" />
            <button type="button" className="absolute right-2"
              onClick={() => setViewPassword(() => viewPassword === false ? true : false)}>
              {
                viewPassword
                  ? <Eye size={20} className="text-zinc-500" />
                  : <EyeSlash size={20} className="text-zinc-500" />
              }
            </button>
          </div>
        </div>
        <Separator className="h-[1.2px] bg-border" />
        <footer className="w-full grid">
          <Button className="font-poppins">
            {isLoading ? <CircleNotch size={14} className="animate-spin" /> : "Cadastrar"}
          </Button>
          <span className="text-sm text-zinc-500/80 mx-auto py-1">ou</span>
          <Button variant={"outline"} className="border gap-1 bg-secondary font-poppins">
            <div className="w-5">
              <img src={Logo} className="bg-cover" />
            </div>
            <p className="text-sm">Entre com Github</p>
          </Button>
        </footer>
      </form>
      <Toaster />
    </main>
  )
}

