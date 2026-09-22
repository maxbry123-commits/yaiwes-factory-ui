import { Card } from "@/components/Card";
import { StepFooter } from "@/components/StepFooter";
import { ApplyDesignButton } from "@/components/step-4/ApplyDesignButton";
import { PluginCarousel } from "@/components/step-4/PluginCarousel";
import { PluginToggleList } from "@/components/step-4/PluginToggleList";
import { ThemeSwitcher } from "@/components/step-4/ThemeSwitcher";
import { TokenPanel } from "@/components/step-4/TokenPanel";

export default function Step4Page() {
  return (
    <main className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-white">
          Paso 4 · Diseño
        </h1>
        <p className="mt-1 text-sm text-white/55">
          Tokens, tema, carrusel y plugins · FE Fusión · eventos reales
        </p>
      </div>
      <Card title="Tema">
        <ThemeSwitcher />
      </Card>
      <Card title="Tokens matte">
        <TokenPanel />
      </Card>
      <Card title="Carrusel de plugins">
        <PluginCarousel />
      </Card>
      <Card title="Plugins activos">
        <PluginToggleList />
      </Card>
      <Card title="Aplicar">
        <ApplyDesignButton />
      </Card>
      <StepFooter current={4} />
    </main>
  );
}
