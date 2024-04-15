import { BasicPage } from '@/components/BasicPage';
import { useTrafficSignalMachine } from '@/hooks/useTrafficSignalMachine';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

export default function TestPage() {
  const { TrafficSignalMachine, changeSignal } = useTrafficSignalMachine();

  return (
    <BasicPage>
      <div className="flex flex-row">
        <div className="p-2 w-1/2 border-2">
          <TrafficSignalMachine />
        </div>
        <div className="flex flex-col p-2 w-1/2 border-2 border-l-0">
          <Button
            onClick={changeSignal}
            className="my-2"
            id="changeSignal">
            手動切換燈號
          </Button>
        </div>
      </div>
    </BasicPage>
  );
}
