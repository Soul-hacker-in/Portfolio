import usesBackgroundPlaceholder from '~/assets/uses-background-placeholder.jpg';
import usesBackground from '~/assets/uses-background.mp4';
import { Footer } from '~/components/footer';
import { Link } from '~/components/link';
import { List, ListItem } from '~/components/list';
import { Table, TableBody, TableCell, TableHeadCell, TableRow } from '~/components/table';
import {
  ProjectBackground,
  ProjectContainer,
  ProjectHeader,
  ProjectSection,
  ProjectSectionContent,
  ProjectSectionHeading,
  ProjectSectionText,
  ProjectTextRow,
} from '~/layouts/project';
import { baseMeta } from '~/utils/meta';
import styles from './uses.module.css';

export const meta = () => {
  return baseMeta({
    title: 'Uses',
    description: 'A list of hardware and software I use to do my thing',
  });
};

export const Uses = () => {
  return (
    <>
      <ProjectContainer className={styles.uses}>
        <ProjectBackground
          src={usesBackground}
          placeholder={usesBackgroundPlaceholder}
          opacity={0.7}
        />
        <ProjectHeader
          title="Uses"
          description="A comprehensive overview of the technologies, frameworks, security tooling, and developer environment I rely on every day to engineer scalable, secure full-stack applications."
        />
        <ProjectSection padding="none" className={styles.section}>
          <ProjectSectionContent>
            <ProjectTextRow width="m">
              <ProjectSectionHeading>Frontend & UI Architecture</ProjectSectionHeading>
              <ProjectSectionText as="div">
                <List>
                  <ListItem>
                    <Link href="https://react.dev/">React.js</Link> & <Link href="https://nextjs.org/">Next.js</Link> are my core frontend frameworks for building high-performance SSR/CSR web applications with optimized routing and prefetching.
                  </ListItem>
                  <ListItem>
                    <Link href="https://redux-toolkit.js.org/">Redux Toolkit</Link> is my standard for complex enterprise state management, accelerating dashboard responsiveness by up to 40%.
                  </ListItem>
                  <ListItem>
                    For styling and component libraries, I frequently leverage <Link href="https://tailwindcss.com/">Tailwind CSS</Link>, <Link href="https://mui.com/">Material-UI</Link>, and Bootstrap for clean, responsive, pixel-perfect interfaces.
                  </ListItem>
                  <ListItem>
                    <Link href="https://www.typescriptlang.org/">TypeScript</Link> and modern JavaScript (ES6+) for type-safe, maintainable component and application logic.
                  </ListItem>
                  <ListItem>
                    <Link href="https://www.figma.com">Figma</Link> for collaborating with product designers and translating design systems into accessible, modular code.
                  </ListItem>
                </List>
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection padding="none" className={styles.section}>
          <ProjectSectionContent>
            <ProjectTextRow width="m">
              <ProjectSectionHeading>Backend, Databases & Cloud</ProjectSectionHeading>
              <ProjectSectionText as="div">
                <List>
                  <ListItem>
                    <Link href="https://nodejs.org/">Node.js</Link> & <Link href="https://expressjs.com/">Express.js</Link> for high-concurrency RESTful APIs and real-time backend microservices.
                  </ListItem>
                  <ListItem>
                    <Link href="https://fastapi.tiangolo.com/">FastAPI (Python)</Link> for asynchronous, high-throughput microservices, data validation, and ML integrations.
                  </ListItem>
                  <ListItem>
                    <Link href="https://socket.io/">WebSockets (Socket.io)</Link> for bidirectional, real-time communications, instant data sync, and collaborative chat.
                  </ListItem>
                  <ListItem>
                    <Link href="https://www.mysql.com/">MySQL</Link> & <Link href="https://www.mongodb.com/">MongoDB</Link> as primary datastores, with <Link href="https://redis.io/">Redis</Link> for caching and query latency optimization.
                  </ListItem>
                  <ListItem>
                    <Link href="https://www.docker.com/">Docker</Link>, <Link href="https://aws.amazon.com/">AWS (EC2, S3, Lambda)</Link>, Nginx, and GitHub Actions CI/CD for containerized deployments and cloud infrastructure.
                  </ListItem>
                </List>
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection padding="none" className={styles.section}>
          <ProjectSectionContent>
            <ProjectTextRow width="m">
              <ProjectSectionHeading>AI, Security & Testing</ProjectSectionHeading>
              <ProjectSectionText as="div">
                <List>
                  <ListItem>
                    <Link href="https://www.tensorflow.org/">TensorFlow</Link> & OpenAI API for integrating ML models, real-time content moderation, and LLM-powered cognitive analytics.
                  </ListItem>
                  <ListItem>
                    <Link href="https://portswigger.net/burp">Burp Suite</Link>, <Link href="https://www.zaproxy.org/">OWASP ZAP</Link>, and Kali Linux for web application penetration testing, OWASP Top 10 vulnerability assessments, and secure code reviews.
                  </ListItem>
                  <ListItem>
                    <Link href="https://www.postman.com/">Postman</Link>, Swagger, and Jest for automated API testing, contract validation, and unit test suites.
                  </ListItem>
                </List>
              </ProjectSectionText>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
        <ProjectSection padding="none" className={styles.section}>
          <ProjectSectionContent>
            <ProjectTextRow stretch width="m">
              <ProjectSectionHeading>Development & Environment</ProjectSectionHeading>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableHeadCell>Code Editor</TableHeadCell>
                    <TableCell>VS Code / Cursor</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeadCell>Primary OS</TableHeadCell>
                    <TableCell>Linux / Ubuntu & macOS</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeadCell>Security OS</TableHeadCell>
                    <TableCell>Kali Linux</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeadCell>Version Control</TableHeadCell>
                    <TableCell>Git (GitHub, GitLab)</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeadCell>API Testing</TableHeadCell>
                    <TableCell>Postman & Swagger</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeadCell>Security Suite</TableHeadCell>
                    <TableCell>Burp Suite & OWASP ZAP</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableHeadCell>Database Tools</TableHeadCell>
                    <TableCell>MySQL Workbench, MongoDB Compass, DBeaver</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </ProjectTextRow>
          </ProjectSectionContent>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </>
  );
};
