import { createMachine } from 'xstate';
import { useMachine } from '@xstate/react';
import { mergeClassNames } from '@/lib/helper';

type TrafficSignalProps = {
  className: string;
  activeStyle: string;
  state: string;
  currentState: string;
};

const TrafficSignal = ({
  className,
  activeStyle,
  state,
  currentState,
}: TrafficSignalProps) => {
  const currentActiveStyle =
    currentState == state ? activeStyle : 'bg-gray-500';
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
    <div className="flex h-32 w-12 flex-col items-center justify-center gap-2 bg-black">
      <TrafficSignal
        className={baseSignalClasses}
        activeStyle="bg-red-500"
        state="Red"
        key="red"
        currentState={currentSignalName}
      />
      <TrafficSignal
        className={baseSignalClasses}
        activeStyle="bg-green-500"
        state="Green"
        key="green"
        currentState={currentSignalName}
      />
      <TrafficSignal
        className={baseSignalClasses}
        activeStyle="bg-yellow-500"
        state="Yellow"
        key="yellow"
        currentState={currentSignalName}
      />
    </div>
  );

  return { TrafficSignalMachine, changeSignal };
};
