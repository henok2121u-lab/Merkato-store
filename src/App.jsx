import Footer from './component/footer'; // check your path carefully

function App() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-between">
      <div>{/* Rest of your page content */}</div>
      <Footer />
    </div>
  );
}

export default App;