import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import QRCode from "qrcode.react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const Qr = z.object({
  url: z.string().nonempty("A url é obrigatório"),
});

export default function QR() {
  type tipo = z.infer<typeof Qr>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<tipo>({
    resolver: zodResolver(Qr),
  });
  const [qr, setQr] = useState("http://localhost:5173/");
  const Make = (data: tipo) => {
    console.log(data);
    setQr(data.url);
  };

  return (
    <div className="grid items-center justify-center min-h-screen">
      <Card className="flex flex-col md:flex-row sm:min-w-auto md:min-w-[24rem]">
        <CardHeader>
          <form action="" onSubmit={handleSubmit(Make)}>
            <Label>Gerador de QR Code</Label>
            <Input
              type="url"
              placeholder="Insira o conteúdo"
              {...register("url")}
            />
            {errors.url && (
              <p className="text-[0.8rem] font-medium text-destructive ">
                {errors.url.message}
              </p>
            )}
            <Button className="w-full mt-4">Gerar</Button>
          </form>
        </CardHeader>
        <div className="px-6 md:pb-6 md:px-0">
          {/* Separador Vertical em Telas Grandes */}
          <Separator
            orientation="horizontal"
            className="hidden md:block sm:hidden my-4 h-full w-[1px]"
          />
          {/* Separador Horizontal em Telas Pequenas */}
          <Separator
            orientation="horizontal"
            className=""
          />
        </div>
        <CardContent className="p-6 m-auto">
          <QRCode value={qr} />
        </CardContent>
      </Card>
    </div>
  );
}
