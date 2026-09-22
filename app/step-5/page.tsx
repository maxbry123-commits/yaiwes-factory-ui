import { Card } from "@/components/Card";
import { StepFooter } from "@/components/StepFooter";
import { DeployPrepAction } from "@/components/step-5/DeployPrepAction";
import { PluginSummary } from "@/components/step-5/PluginSummary";
import { StatusChecklist } from "@/components/step-5/StatusChecklist";

export default function Step5Page() {
  return (
    <main className="space-y-5">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-white">
          Paso 5 · Revisión y despliegue
        </h1>
        <p className="mt-1 text-sm text-white/55">
          Checklist, plugins y deploy-prep · FE Fusión · sin HF
        </p>
      </div>
      <Card title="Estado del run">
        <StatusChecklist />
      </Card>
      <Card title="Resumen de plugins">
        <PluginSummary />
      </Card>
      <Card title="Preparación de despliegue">
        <DeployPrepAction />
      </Card>
      <StepFooter current={5} />
    </main>
  );
}
