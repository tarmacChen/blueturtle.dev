import { RootLayout } from '@/components/RootLayout';
import { useTrafficSignalMachine } from '@/hooks/useTrafficSignalMachine';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export default function TestPage() {
  const { TrafficSignalMachine, changeSignal } = useTrafficSignalMachine();

  return (
    <RootLayout>
      <div className="flex flex-row">
        <div className="w-1/2 border-2 p-2">
          <TrafficSignalMachine />
        </div>
        <div className="flex w-1/2 flex-col border-2 border-l-0 p-2">
          <Button
            onClick={changeSignal}
            className="my-2"
            id="changeSignal">
            手動切換燈號
          </Button>
        </div>
      </div>
    </RootLayout>
  );
}
