import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import Trainers from './pages/Trainers';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Trainers />
    </QueryClientProvider>
  )
}

export default App
