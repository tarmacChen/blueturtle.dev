import { createMachine } from 'xstate';
import { useMachine } from '@xstate/react';
import { mergeClassNames } from '@/lib/helper';

type TrafficSignalProps = {
  className: string;
  activeStyle: string;
  signalName: string;
  currentSignalName: string;
};

const TrafficSignal = ({
  className,
  activeStyle,
  signalName,
  currentSignalName,
}: TrafficSignalProps) => {
  const currentActiveStyle =
    currentSignalName == signalName ? activeStyle : 'bg-gray-500';
  const signalClasses = mergeClassNames(className, currentActiveStyle);

  return <div className={signalClasses} />;
};

const trafficSignalMachine = createMachine({
  id: 'change',
  initial: 'Red',
  states: {
    Red: {
      on: { change: 'Green' },
    },
    Yellow: {
      on: { change: 'Red' },
    },
    Green: {
      on: { change: 'Yellow' },
    },
  },
});

export const useTrafficSignalMachine = () => {
  const [current, send] = useMachine(trafficSignalMachine);
  const currentSignalName = current.value.toString();
  const baseSignalClasses = 'w-8 h-8 rounded-full';

  const changeSignal = () => {
    send({ type: 'change' });
  };

  const TrafficSignalMachine = () => (
    <div className="flex flex-col w-12 h-32 bg-black gap-2 justify-center items-center">
      <TrafficSignal
        className={baseSignalClasses}
        activeStyle="bg-red-500"
        signalName="Red"
        key="red"
        currentSignalName={currentSignalName}
      />
      <TrafficSignal
        className={baseSignalClasses}
        activeStyle="bg-green-500"
        signalName="Green"
        key="green"
        currentSignalName={currentSignalName}
      />
      <TrafficSignal
        className={baseSignalClasses}
        activeStyle="bg-yellow-500"
        signalName="Yellow"
        key="yellow"
        currentSignalName={currentSignalName}
      />
    </div>
  );

  return { TrafficSignalMachine, changeSignal };
};
