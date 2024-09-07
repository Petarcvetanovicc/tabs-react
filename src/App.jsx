import { useEffect, useState } from 'react'

const url = 'https://www.course-api.com/react-tabs-project'

const App = () => {
  const [jobs, setJobs] = useState([])
  const [companies, setCompanies] = useState([])
  const [count, setCount] = useState(0)

  const fetchItems = async () => {
    const resp = await fetch(url)
    const data = await resp.json()
    setJobs(data)
    setCompanies(() => data.map((item) => item.company))
  }

  useEffect(() => {
    fetchItems()
  })

  const handleCount = (number) => {
    setCount(number)
  }

  if (jobs.length === 0) {
    return (
      <div className="jobs-center">
        <div className="loading"></div>
      </div>
    )
  }

  return (
    <section className="jobs-center">
      <div className="btn-container">
        {companies.map((company, index) => {
          return (
            <button
              className={count === index ? 'job-btn active-btn' : 'job-btn'}
              key={index}
              onClick={() => handleCount(index)}
            >
              {company}
            </button>
          )
        })}
      </div>
      <article className="job-info">
        <h3>{jobs[count].title}</h3>
        <span className="job-company">{jobs[count].company}</span>
        <p className="job-date">{jobs[count].dates}</p>
        <div>
          {jobs[count].duties.map((duty, index) => {
            return (
              <div className="job-desc" key={index}>
                <p>{duty}</p>
              </div>
            )
          })}
        </div>
      </article>
    </section>
  )
}
export default App
