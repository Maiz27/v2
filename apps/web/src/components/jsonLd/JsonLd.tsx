import { Thing, WithContext } from 'schema-dts';

type Props = {
  schema: Thing;
};

function withContext(schema: Thing): WithContext<Thing> {
  const context: WithContext<Thing>['@context'] = 'https://schema.org';
  return Object.assign({ '@context': context }, schema);
}

const JsonLd = ({ schema }: Props) => {
  const jsonLd = withContext(schema);

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
      }}
    />
  );
};

export default JsonLd;
