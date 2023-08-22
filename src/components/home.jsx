import React, { useRef, useState } from 'react'
import { OpenAIApi, Configuration } from 'openai'
import Loading from './loading';
import TextArea from './textArea';
import TextCode from './textCode';

const configuration = new Configuration({
  apiKey: ''
});

const openai = new OpenAIApi(configuration);

const Home = () => {
  const [showHide,setShowHide] = useState(false);
  const gptRef = useRef()
  const [loading, setLoading] = useState(false)
  const [dataInfoGpt, setDataInfoGpt] = useState([])
  const [dataInfoDallE,setDataInfoDallE] = useState([])
  const doApiGpt = async () => {
    setLoading(true)
    const { data } = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: gptRef.current.value,
      temperature: 0.7,
      max_tokens: 4000,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    })
    console.log(data.choices[0].text)


    // const resp = [...dataInfoGpt]
    // resp.push(data.choices[0].text)
    // setDataInfoGpt(resp)
    const obj = {
      question: gptRef.current.value,
      answer: data.choices[0].text
    }
    setDataInfoGpt([...dataInfoGpt, obj])
    gptRef.current.value = ""
    setDataInfoDallE([])
    setLoading(false)
  }

  const doApiDallE = async () => {
    setLoading(true)
    const {data} = await openai.createImage({
      prompt: gptRef.current.value,
      n:10,
      size:'1024x1024'
    })
    setDataInfoDallE(data.data)
    setDataInfoGpt([])
    gptRef.current.value = ""
    console.log(data.data)
    setLoading(false)
  }
  return (
    <div>
      {!showHide?
      <div className='py-[30px]  container max-w-[440px] mx-auto lg:max-w-[1024px] md:max-w-[768px]'>
        <h2 className='text-5xl font-medium leading-tight'>Chat GPT 4:</h2>
        <div className='relative'>
          <TextArea
            doApi={doApiGpt}
            placeholder={'Ask me question...'}
            searchRef={gptRef}
          />
          {loading && <Loading />}
          <button onClick={()=>setShowHide(!showHide)} className='btn mt-2'>DALL-E2</button>
        </div>
        {[...dataInfoGpt].reverse().map((resp,i)=>(
          <div key={i} className='p-[20px] border-dotted  mt-5 bg-slate-700 rounded-3xl border'>
            <p className='text-[1.2em] '>Question: {resp.question}</p>
            <TextCode text={resp.answer} textAnim={i==0?true:false}/>
          </div>
        ))}
      </div>
      :
      <div className='py-[30px]  container max-w-[440px] mx-auto lg:max-w-[1024px] md:max-w-[768px]'>
      <h2 className='text-5xl font-medium leading-tight'>Dall-E2:</h2>
      <div className='relative'>
        <TextArea
          doApi={doApiDallE}
          placeholder={'Type your image dream...'} 
          searchRef={gptRef}
        />
        {loading && <Loading />}
        <button onClick={()=>setShowHide(!showHide)} className='btn mt-2'>Chat GPT 4</button>
      </div>
          <div className='flex flex-wrap w-[100%] mx-auto mt-4'>
            {!loading && dataInfoDallE.map(({url},i)=>(
              <div className='w-[20%] p-[5px]'>
              <img className='hover:shadow-lg hover:shadow-white rounded-box cursor-pointer' width={'100%'} key={i} src={url}  alt={gptRef.current.value}/>
              </div>
            ))}
          </div>
    </div>
    }
    </div>
  )
}

export default Home