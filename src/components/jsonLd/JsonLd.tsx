import { Thing, WithContext } from 'schema-dts';

type Props = {
  schema: Thing;
};

const JsonLd = ({ schema }: Props) => {
  const jsonLd: WithContext<Thing> = {
    '@context': 'https://schema.org',
    '@type': (schema as any)['@type'],
    ...(schema as object),
  };

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};

export default JsonLd;
