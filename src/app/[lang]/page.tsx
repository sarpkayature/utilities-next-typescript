import { Switch } from 'components/index';
import { getDictionary } from 'src/locales/dictionaries';

export default async function Home({ params }: { params: { lang: string } }) {
  const dict = await getDictionary(params.lang);

  console.log(dict);
  const a = 40;
  return (
    <main>
      <h1>{dict.home.description}</h1>
      <Switch>
        <Switch.Case condition={a > 30}>Element</Switch.Case>
        <Switch.Default>Default</Switch.Default>
      </Switch>
    </main>
  );
}
