import React from 'react'
import styled from 'styled-components'

import ApplyButton from './ApplyButton'
import Body from '../Card/Body'
import CalendarIcon from '../Icons/CalendarIcon'
import Card from '../Card/Card'
import ClockIcon from '../Icons/ClockIcon'
import Header from '../Card/Header'
import MapIcon from '../Icons/MapIcon'
import Title from '../Card/Title'
import SourceImage from './SourceImage'
import { formatDateRange, formatDate } from '../../date';

const Section = styled.div`
  margin: 1em 0;
`

const Job = ({ job }) =>
  <div className="row">
    <div className="col-md-8 col-md-offset-2">
      <Card>
        <Header>
          <SourceImage source={job.source} />
        </Header>
        <Body>
          <Title>{job.title}</Title>
          <Section>
            <MapIcon padRight /> {job.address}
          </Section>
          <Section>
            <CalendarIcon padRight /> {formatDateRange(job.startDate, job.endDate)}
          </Section>
          <Section>
            <ClockIcon padRight /> Apply before {formatDate(job.endDate)}
          </Section>

          <div className="visible-xs">
            <ApplyButton link={job.link} />
          </div>

          <p><strong>About the job</strong></p>

          <div style={{ marginBottom: '15px' }} dangerouslySetInnerHTML={{ __html: job.text }} />
          {job.text.length > 250 && <ApplyButton link={job.link} />}
        </Body>
      </Card>
    </div>
  </div>

export default Job
