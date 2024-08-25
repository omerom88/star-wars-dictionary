import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ChevronDown, ChevronUp } from 'lucide-react';

type ExpandableCardProps = {
    title: string;
    titleColor: string;
    children: React.ReactNode;
};

export const ExpandableCard = ({
    title,
    titleColor,
    children,
}: ExpandableCardProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => setIsExpanded(!isExpanded);

    return (
        <Card>
            <CardHeader
                className="cursor-pointer flex flex-row justify-between items-center"
                onClick={toggleExpand}
            >
                <CardTitle style={{ color: titleColor }}>{title}</CardTitle>
                {isExpanded ? (
                    <ChevronUp size={20} />
                ) : (
                    <ChevronDown size={20} />
                )}
            </CardHeader>
            {isExpanded && (
                <CardContent className="pt-2">{children}</CardContent>
            )}
        </Card>
    );
};
