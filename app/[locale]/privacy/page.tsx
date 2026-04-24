import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Политика конфиденциальности — AutomatikaLab',
  description: 'Политика обработки персональных данных AutomatikaLab в соответствии с ФЗ-152.',
  robots: { index: false, follow: false },
}

export default function PrivacyPage() {
  return (
    <div
      style={{
        background: 'var(--cream)',
        minHeight: '100vh',
        paddingTop: 'clamp(100px, 12vh, 160px)',
        paddingBottom: 'clamp(64px, 10vh, 120px)',
        paddingLeft: 'clamp(24px, 5vw, 120px)',
        paddingRight: 'clamp(24px, 5vw, 120px)',
      }}
    >
      <div style={{ maxWidth: '720px' }}>

        <p style={{ fontFamily: 'var(--font-inter)', fontSize: '13px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--sage)', marginBottom: '24px' }}>
          Правовые документы
        </p>

        <h1 style={{ fontFamily: 'var(--font-hanken)', fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05, color: 'var(--forest)', marginBottom: '16px' }}>
          Политика конфиденциальности
        </h1>

        <p style={{ fontFamily: 'var(--font-inter)', fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '56px' }}>
          Последнее обновление: апрель 2026
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>

          <Section title="1. Общие положения">
            <p>Настоящая Политика конфиденциальности определяет порядок обработки персональных данных пользователей AutomatikaLab (далее — «Оператор»).</p>
            <p>Оператор действует в соответствии с Федеральным законом №152-ФЗ «О персональных данных» от 27.07.2006.</p>
            <p>Используя сайт automaticalab.app и Telegram-бот @Automaticalabbot, вы соглашаетесь с условиями настоящей Политики.</p>
          </Section>

          <Section title="2. Какие данные мы собираем">
            <ul>
              <li>Имя и фамилия (при обращении через Telegram-бот или форму)</li>
              <li>Telegram ID и username (при взаимодействии с ботом)</li>
              <li>Сообщения, направленные боту или на email контакт@automaticalab.app</li>
              <li>Информация о вашем бизнесе (ниша, задачи, бюджет) — только то, что вы сообщаете добровольно</li>
            </ul>
            <p style={{ marginTop: '16px' }}>Мы <strong>не собираем</strong>: платёжные данные, паспортные данные, куки-файлы, данные о местоположении.</p>
          </Section>

          <Section title="3. Цели обработки данных">
            <ul>
              <li>Обработка заявок и консультации по услугам</li>
              <li>Связь с потенциальными и действующими клиентами</li>
              <li>Улучшение качества сервиса</li>
            </ul>
          </Section>

          <Section title="4. Хранение и защита данных">
            <p>Данные хранятся на серверах в ЕС и РФ. Срок хранения — не более 3 лет с момента последнего взаимодействия или до момента отзыва согласия.</p>
            <p>Мы применяем технические и организационные меры для защиты данных от несанкционированного доступа.</p>
          </Section>

          <Section title="5. Передача данных третьим лицам">
            <p>Мы не продаём и не передаём ваши данные третьим лицам, за исключением:</p>
            <ul>
              <li>Сервисов автоматизации (n8n — для обработки рабочих процессов)</li>
              <li>Anthropic API — для AI-обработки запросов (без привязки к личным данным)</li>
              <li>Случаев, предусмотренных законодательством РФ</li>
            </ul>
          </Section>

          <Section title="6. Ваши права">
            <p>В соответствии с ФЗ-152 вы вправе:</p>
            <ul>
              <li>Запросить информацию о хранящихся данных</li>
              <li>Потребовать исправления неточных данных</li>
              <li>Отозвать согласие на обработку и потребовать удаления данных</li>
            </ul>
            <p style={{ marginTop: '16px' }}>Для реализации прав — напишите на <a href="mailto:contact@automaticalab.app" style={{ color: 'var(--sage)' }}>contact@automaticalab.app</a>. Срок ответа — 10 рабочих дней.</p>
          </Section>

          <Section title="7. Куки-файлы">
            <p>Сайт automaticalab.app <strong>не использует куки-файлы</strong> для отслеживания и аналитики. Шрифты загружаются через Next.js без обращений к Google Fonts.</p>
          </Section>

          <Section title="8. Изменения Политики">
            <p>Актуальная версия всегда доступна по адресу automaticalab.app/privacy. При существенных изменениях уведомляем через Telegram-канал.</p>
          </Section>

          <Section title="9. Контакты">
            <p>AutomatikaLab / AutomaticaGroup</p>
            <p>Email: <a href="mailto:contact@automaticalab.app" style={{ color: 'var(--sage)' }}>contact@automaticalab.app</a></p>
            <p>Telegram: <a href="https://t.me/automatikagroup" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--sage)' }}>@automatikagroup</a></p>
          </Section>

        </div>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ borderTop: '1px solid rgba(46,58,31,0.1)', paddingTop: '32px' }}>
      <h2 style={{ fontFamily: 'var(--font-hanken)', fontSize: 'clamp(18px, 2vw, 22px)', fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--forest)', marginBottom: '16px' }}>
        {title}
      </h2>
      <div style={{ fontFamily: 'var(--font-inter)', fontSize: '15px', lineHeight: 1.7, color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {children}
      </div>
    </div>
  )
}
