import * as Apps from 'src/apps';

function Page(): JSX.Element {
  const search = window.location.search.match(/(type|modal)=([a-z_]+)/) || '';
  return (
    <>
      {search[2] === 'sidebar' && <Apps.SideBar />}
      {search[2] === 'navbar' && <Apps.NavBar />}
    </>
  );
}

export default Page;
