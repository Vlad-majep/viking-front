// ? styles
import s from './Faq.module.css';

// * utils
// ? constants
import { QUESTIONS } from '../../utils/constants';

function Faq() {
  return (
    <section className={s.main}>
      <h1 className={`first-title ${s.title}`}>Faq</h1>
      <div className={s.questions}>
        {QUESTIONS.map((question, index) => {
          return (
            <div className={s.question} key={index}>
              <h3 className={s.questions__title}>{question.question}</h3>
              <p className={s.answer}>{question.answer}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Faq;
