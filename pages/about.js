import Layout from '../components/layout';
import { Pagehead, Text, Box } from '@primer/components';

function About() {

  return (
    <>
      <Layout>
        <Pagehead> <Text as='p' fontWeight="bold">About LoMiArch</Text> </Pagehead>
        <Text as='p'>LoMiArch was started since I personally wasn't able to find a photo application that was simple
          and fast enough for my needs. Especially loving some features in non-Open Source projects that allow
          the ability to recognize faces or have easy syncing. And after looking at other solutions finally decided
          to throw my hat in the ring and try one myself. <br />
          Let me know if you find any improvments that can be made and hope you enjoy.
        </Text>
        <Pagehead> <Text as='p' fontWeight="bold">Attribution</Text> </Pagehead>
          <Box>
            <dl>
              <dt><Text as='p' fontWeight="bold">NextJS</Text></dt>
              <dd>* <b>Website:</b> https://nextjs.org</dd>
              <dd>* <b>License:</b> MIT License</dd>
              <dt><Text as='p' fontWeight="bold">npm</Text></dt>
              <dd>* <b>Website:</b> https://www.npmjs.com/</dd>
              <dd>* <b>License:</b> https://github.com/npm/cli/blob/latest/LICENSE</dd>
              <dt><Text as='p' fontWeight="bold">Primer React</Text></dt>
              <dd>* <b>Website:</b> https://primer.style/react/</dd>
              <dd>* <b>License:</b> MIT License</dd>
              <dt><Text as='p' fontWeight="bold">react-infinite-scroll-component</Text></dt>
              <dd>* <b>Website:</b> https://github.com/ankeetmaini/react-infinite-scroll-component </dd>
              <dd>* <b>License:</b> MIT License</dd>
              <dt><Text as='p' fontWeight="bold">useHooks()</Text></dt>
              <dd>* <b>Website:</b> https://usehooks.com/</dd>
              <dd>* <b>License:</b> Unlicense License</dd>
              <dt><Text as='p' fontWeight="bold">react-simple-image-viewer</Text></dt>
              <dd>While this project is not present here, their CSS served as inspiration for parts of this project.</dd>
              <dd>* <b>Website:</b> https://github.com/specter256/react-simple-image-viewer</dd>
              <dd>* <b>License:</b> MIT License</dd>
              <dt><Text as='p' fontWeight="bold">deepmerge</Text></dt>
              <dd>* <b>Website:</b> </dd>
              <dd>* <b>License:</b> </dd>
              <dt><Text as='p' fontWeight="bold">styled-components</Text></dt>
              <dd>* <b>Website:</b> </dd>
              <dd>* <b>License:</b> </dd>
              <dt><b> </b></dt>
              <dd>* <b>Website:</b> </dd>
              <dd>* <b>License:</b> </dd>
            </dl>
          </Box>
      </Layout>
    </>
  )
}

export default About;
