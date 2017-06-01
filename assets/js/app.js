/**
 * @license
 * Copyright 2016 TruongLuu. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 *   _____                               _                
 *  |_   _| __ _   _  ___  _ __   __ _  | |   _   _ _   _ 
 *    | || '__| | | |/ _ \| '_ \ / _` | | |  | | | | | | |
 *    | || |  | |_| | (_) | | | | (_| | | |__| |_| | |_| |
 *    |_||_|   \__,_|\___/|_| |_|\__, | |_____\__,_|\__,_|
 *                               |___/                             
 *
 * @author TruongLuu <me@truongluu.com>
 * @date 2017-06-01 15:40:42
 * @lastModified 2017-06-01 23:36:22
 */
'use strict';

class AppRoot extends React.Component {
	render() {
		return <div className="container">
			<div className="wrapper">
				<LeftComponent name={this.props.data.name} title={this.props.data.title} info={this.props.data.information} 
					interesting={this.props.data.interesting} avatar={this.props.data.avatar} />
				<RightComponent jobs={this.props.data.jobs} skills={this.props.data.skills}
					education={this.props.data.education} />
			</div>
		</div>;
	}
}

class LeftComponent extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const block = function(icon, text, isHtml) {
			const textRaw = isHtml ? <span dangerouslySetInnerHTML={{ __html: text }}></span> : <span>{text}</span>;

			return <div className="block-inline">
				<i className={"fa "+icon} aria-hidden="true"></i>
				{textRaw}
			</div>;
		}

		return <div className="component info">
			<div className="user">
				<div className="avatar" style={{ backgroundImage: 'url('+this.props.avatar+')' }}></div>

				<div className="title">{this.props.name}</div>
				<div className="hint">{this.props.title}</div>
			</div>

			<div className="user-info">
				<div className="block-wrapper">
					{this.props.info.map((info) => {
						return block(info.icon, info.text, info.isHtml || false);
					})}
				</div>

				<div className="block-wrapper">
					<h3>INTERESTING</h3>
					<ol className="list-unstyled">
						{this.props.interesting.map((value) => {
							return <li className="block-inline">{value}</li>;
						})}
					</ol>
				</div>
			</div>
		</div>;
	}
}

class RightComponent extends React.Component {
	constructor(props) {
		super(props);

		
	}

	render() {
		return <div className="component details">
			<div className="main">
				<div className="job-history">
					<h3 className="detail-title"><i className="fa fa-briefcase job-icon"></i> Work History</h3>

					{this.props.jobs.map((job) => {
						return <Job {...job} />;
					})}
				</div>

				<div className="job-history">
					<h3 className="detail-title"><i className="fa fa-pie-chart job-icon"></i> Skills</h3>
					{this.props.skills.map((skill) => {
						return <Skill {...skill} />;
					})}
				</div>

				<div className="job-history">
					<h3 className="detail-title"><i className="fa fa-graduation-cap job-icon"></i> Education</h3>
					{this.props.education.map((value) => {
						return <div className="job">
							<div className="flex title">
								<h3>{value.name}</h3>
								<span>{value.time}</span>
							</div>
						</div>;
					})}
				</div>
			</div>
		</div>;
	}
}

class Skill extends React.Component {
	render() {
		const options = this.props.options || [];
		const grouped = [];

		var index = -1;
		for(var i = 0; i < options.length; i++) {
			if(i % 2 === 0) {
				++index;
			}

			if(!grouped[index]) {
				grouped[index] = [];
			}

			grouped[index].push(options[i]);
		}

		return <div className="skill-wrapper job">
			<h3 className="skill-title title">{this.props.title}</h3>
			{grouped.map((data) => {
				return <div className="skill-childs" data-total={data.length}>
					{data.map((sub) => {
						return <ProgressBar title={sub.name} progressing={sub.value} />;
					})}
				</div>;
			})}
		</div>;
	}
}

class ProgressBar extends React.Component {
	render() {
		return <div className="progress">
			<span className="progress-bar-title">{this.props.title}</span>
			<span className="progress-bar"><span className="progressing" style={{ width: this.props.progressing + '%' }}></span></span>
		</div>;
	}
}

class Job extends React.Component {
	render() {
		return <div className="job">
			<div className="flex title">
				<h3>{this.props.project}</h3>
				<span>{this.props.workTime}</span>
			</div>

			<a href={this.props.companyRef} className="company">{this.props.company}</a>

			<ol className="list-unstyled job-describe">
				<li>Detail: {this.props.description}</li>
				<li>Position: {this.props.position}</li>
				<li>Technology: {this.props.tech}</li>
			</ol>
		</div>;
	}
}

ReactDOM.render(<AppRoot data={data} />, document.getElementById('root'));