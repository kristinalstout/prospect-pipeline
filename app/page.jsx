import Dashboard from "@components/Dashboard";

const Home = () => (
  <section className='w-full flex-center flex-col'>
    <h1 className='head_text text-center'>
      {/* Cultivate Relationships */}
      <br className='max-md:hidden' />
      <span className='orange_gradient text-center'> Cultivate Relationships</span>
    </h1>
    

    <Dashboard />
  </section>
);

export default Home;