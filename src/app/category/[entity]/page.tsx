import { FullScreenText } from '@/components/ui/full-screen-text';
import { CategoryComponent } from '@/components/category/category-component';

export default function CategoryPage({
    params,
}: {
    params: { [key: string]: string };
}) {
    const { entity } = params;
    if (!entity) return null;

    if (entity !== 'people') {
        return <FullScreenText text={entity as string} />;
    }

    return <CategoryComponent />;
}
