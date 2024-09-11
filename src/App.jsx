import axios from 'axios';
import { useEffect, useState } from 'react';
import Switch from '@mui/material/Switch';

function App() {
  const [data, setData] = useState([]);
  const [showVerified, setShowVerified] = useState(true);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleVerifiedChange = () => {
    setShowVerified(!showVerified);
  };

  const handleFeedbackChange = () => {
    setShowFeedback(!showFeedback);
  };

  const fetchData = async () => {
    const response = await axios.get('https://cat-fact.herokuapp.com/facts');
    setData(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getFilteredData = () => {
    return data.filter((fact) => {
      const isVerified = showVerified ? fact.status.verified : !fact.status.verified;
      const hasFeedback = showFeedback ? fact.status.feedback !== '' : fact.status.feedback === '';
      return isVerified && hasFeedback;
    });
  };

  const filteredData = getFilteredData();

  return (
    <div className='w-screen h-screen flex flex-col bg-slate-700'>
      <div className='flex flex-col bg-slate-300 w-full h-full items-center justify-center gap-8'>
        <h1 className='text-3xl font-bold text-slate-900'>Interesting facts about cats!</h1>
        <div className='w-11/12 h-3/4 flex flex-col bg-slate-400 items-center justify-center border border-slate-700 rounded-md'>
          <div className='w-full h-10 flex items-center justify-center border border-black rounded-md mb-4 bg-slate-900'>
            <Switch checked={showFeedback} onChange={handleFeedbackChange} />
            <h1 className='text-lg font-bold text-white'>
              {showFeedback ? 'No Feedback' : 'Feedback Present'}
            </h1>
          </div>
          <div className='w-full h-10 flex items-center justify-center border border-black rounded-md bg-slate-700'>
            <Switch checked={showVerified} onChange={handleVerifiedChange} />
            <h1 className='text-lg font-bold text-white'>
              {showVerified ? 'Verified' : 'Not Verified'}
            </h1>
          </div>
          <div className='w-full h-full flex flex-col items-center justify-center'>
            {filteredData.length > 0 ? (
              <ol className='flex flex-col gap-3 justify-evenly p-2'>
                {filteredData.map((fact) => (
                  <li key={fact._id} className='text-white border border-slate-700 p-2'>
                    {fact.text}
                  </li>
                ))}
              </ol>
            ) : (
              <p className='text-red-500 font-bold'>No data matching the filters available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;



