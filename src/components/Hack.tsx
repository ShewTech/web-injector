import { Button, Group, Text } from '@mantine/core';
import React from 'react';
import { useMessenger } from '~/components/Messenger';

export interface HackProps {
  hack: {
    id: string;
    name: string;
    functions: Record<string, string>;
  };
}

const Hack = ({ hack }: HackProps) => {
  const [status, setStatus] = React.useState<
    'Injecting...' | 'Injected' | 'Failed' | null
  >(null);
  const { inject, execute } = useMessenger();

  const handleInject = async () => {
    setStatus('Injecting...');
    try {
      await inject(hack.id);
      setStatus('Injected');
    } catch (e) {
      console.error(e);
      setStatus('Failed');
      setTimeout(() => setStatus(null), 3000);
    }
  };

  return (
    <Group wrap="nowrap" justify="space-between">
      <Text size="lg" fw={500}>
        {hack.name}
      </Text>
      <Group wrap="nowrap" gap={5}>
        {status === 'Injected' ? (
          Object.entries(hack.functions).map(([key, value]) => (
            <Button
              variant="light"
              key={value}
              onClick={() => execute(`${value}();`)}
            >
              {key}
            </Button>
          ))
        ) : status === 'Failed' ? (
          <Text size="sm" c="red">
            Failed to inject
          </Text>
        ) : (
          <Button
            loading={status === 'Injecting...'}
            variant="light"
            onClick={() => void handleInject()}
          >
            Inject
          </Button>
        )}
      </Group>
    </Group>
  );
};

export default Hack;
