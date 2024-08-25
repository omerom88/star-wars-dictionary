import { Button } from '@/components/ui/button';

type SensorButtonProps = {
    title: number;
    selected: boolean;
    textColor: string;
    onClick: (sensorId: number) => void;
};

export const SensorButton = ({
    title,
    onClick,
    selected,
    textColor,
}: SensorButtonProps) => {
    return (
        <Button
            className={`${selected ? 'bg-primary/50 hover:bg-primary/90' : 'bg-primary'} py-5`}
            onClick={() => onClick(title)}
            style={{ color: textColor }}
        >
            {title}
        </Button>
    );
};
