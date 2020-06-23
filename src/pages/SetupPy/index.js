import React from "react";
import ReactMarkdown from 'react-markdown'
import PropTypes from "prop-types";

import { Paper, Grid, FormGroup, FormControlLabel, Switch, TextField, Button } from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
import SyntaxHighlighter from "react-syntax-highlighter";
import { solarizedDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { CopyToClipboard } from 'react-copy-to-clipboard';

import markdownSourceIntro from "pages/SetupPy/SetupPy-intro.md"
import pythonClassifiers from "pages/SetupPy/classifiers.json"
import Header from "components/Header";
import { Helmet } from "react-helmet";



export default class SetupPy extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      intro: null,
      code: "",
      copied: false,
      author: "Hank",
      url: "",
      authorEmail: "hank@pythoncreate.com",
      description: "Description of the project.",
      classifiers: [pythonClassifiers[0], pythonClassifiers[400], pythonClassifiers[724]],
      version: "0.0.1",
      requirements: "setuptools>=45.0",
      srcFolder: true,
      versionInPackage: true,
      packageData: false,
      packageName: "hello_world",
      entrypoint: false,
    };
  }

  componentDidMount() {
    fetch(markdownSourceIntro).then((response) => response.text()).then((text) => {
      this.setState({ intro: text })
    });

    this.setState({ code: this.getPythonCode() });
  }

  getPythonCode() {
    var code = [
      `"""Install packages as defined in this file into the Python environment."""`,
      `from setuptools import setup, ` + (this.state.srcFolder ? "find_namespace_packages" : "find_packages"),
    ];

    code.push("");

    if (this.state.versionInPackage) {
      code.push(`# The version of this tool is based on the following steps:`);
      code.push(`# https://packaging.python.org/guides/single-sourcing-package-version/`);
      code.push(`VERSION = {}`);
      code.push("");
      code.push(`with open("./` + (this.state.srcFolder ? "src/" : "") + this.state.packageName + `/__init__.py") as fp:`);
      code.push(`    # pylint: disable=W0122`);
      code.push(`    exec(fp.read(), VERSION)`);
      code.push("");
    }

    code.push(`setup(`);
    code.push(`    name="` + this.state.packageName + `",`);
    if (this.state.author) {
      code.push(`    author="` + this.state.author + `",`);
    }
    if (this.state.authorEmail) {
      code.push(`    author_email="` + this.state.authorEmail + `",`);
    }
    if (this.state.url) {
      code.push(`    url="` + this.state.url + `",`);
    }
    if (this.state.description) {
      code.push(`    description="` + this.state.description + `",`);
    }

    if (this.state.versionInPackage) {
      code.push(`    version=VERSION.get("__version__", "0.0.0"),`);
    } else if (this.state.version) {
      code.push(`    version="` + this.state.version + `",`);
    }

    if (this.state.srcFolder) {
      code.push(`    package_dir={"": "src"},`);
      code.push(`    packages=find_namespace_packages(where="src", exclude=["tests"]),`);
    } else {
      code.push(`    packages=find_packages(where=".", exclude=["tests"]),`);
    }

    if (this.state.packageData) {
      code.push(`    include_package_data=True,`);
      code.push(`    package_data={"` + this.state.packageName + `": ["src/` + this.state.packageName + `/resources/*"]},`);
    }

    if (this.state.requirements) {
      code.push(`    install_requires=[`);
      this.state.requirements.split(/,?\s+/).forEach(
        r => {
          if (r.trim()) {
            code.push(`        "` + r.trim() + `",`);
          }
        }
      );
      code.push(`    ],`);
    }

    if (this.state.entrypoint) {
      code.push(`    entry_points={`);
      code.push(`        "console_scripts": [`);
      code.push(`            "` + this.state.packageName + `=` + this.state.packageName + `.__main__.main",`)
      code.push(`    ]},`);
    }
    if (this.state.classifiers.length > 0) {
      code.push(`    classifiers=[`);
      this.state.classifiers.forEach(
        c => code.push(`        "` + c + `",`)
      );
      code.push(`    ],`);
    }
    code.push(`)`);

    return code.join("\n");
  }

  filterPackagename(value) {
    return value.replace(/[^\w\s-]/gi, "").replace("-", "_");
  }

  filterAuthorname(value) {
    return value.replace("\"", "\\\"");
  }

  filterEmailAddress(value) {
    return value.replace(/[^\w\s!@#$%&'*+-/\\=?^_`{|}~]/gi, "");
  }

  filterURL(value) {
    return value.replace(/[^\w\s!@#$%&'*+-/\\=?^_`{|}~():]/gi, "");
  }

  filterDescription(value) {
    return value.replace("\"", "\\\"");
  }

  updatePythonCode() {
    this.setState({ code: this.getPythonCode() });
    this.setState({ copied: false });
  }

  render() {
    const versionField = this.state.versionInPackage ? <></> : (
      <TextField
        id="version"
        label="Version"
        defaultValue={this.state.version}
        variant="outlined"
        onChange={e => {
          this.setState({ version: e.target.value || this.defaultValue }, this.updatePythonCode);
        }}
      />
    );

    return (
      <React.Fragment>
        <Header onDrawerToggle={this.props.handleDrawerToggle} />
        <Helmet>
          <title>setup.py generator for Python projects | Python Create</title>
          <meta name="description" content="Use the setup.py generator to get perfect the way you're installing your Python package." />
          <meta name="robots" content="index, follow" />
        </Helmet>
        <main className={this.props.classes.main}>
          <Paper className={this.props.classes.paper}>
            <div className={this.props.classes.contentWrapper}>
              <ReactMarkdown source={this.state.intro} />

              <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
              >
                <Grid item xs={12}>
                  <FormGroup>
                    <TextField
                      required
                      id="name"
                      label="Package name"
                      defaultValue={this.state.packageName}
                      variant="outlined"
                      onChange={e => {
                        this.setState({ packageName: this.filterPackagename(e.target.value) || this.defaultValue }, this.updatePythonCode);
                      }}
                    />
                    <TextField
                      id="author"
                      label="Author"
                      defaultValue={this.state.author}
                      variant="outlined"
                      onChange={e => {
                        this.setState({ author: this.filterAuthorname(e.target.value) || this.defaultValue }, this.updatePythonCode);
                      }}
                    />
                    <TextField
                      id="url"
                      label="URL"
                      defaultValue={this.state.url}
                      variant="outlined"
                      onChange={e => {
                        this.setState({ url: this.filterURL(e.target.value) || this.defaultValue }, this.updatePythonCode);
                      }}
                    />
                    <TextField
                      id="author-email"
                      label="E-mail"
                      defaultValue={this.state.authorEmail}
                      variant="outlined"
                      onChange={e => {
                        this.setState({ authorEmail: this.filterEmailAddress(e.target.value) || this.defaultValue }, this.updatePythonCode);
                      }}
                    />
                    <TextField
                      id="description"
                      label="Description"
                      defaultValue={this.state.description}
                      multiline
                      rowsMax={4}
                      variant="outlined"
                      onChange={e => {
                        this.setState({ description: this.filterDescription(e.target.value) || this.defaultValue }, this.updatePythonCode);
                      }}
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={this.state.srcFolder}
                          onChange={() => {
                            this.setState({ srcFolder: !this.state.srcFolder }, this.updatePythonCode);
                          }}
                        />
                      }
                      label={<div>Package is placed in <code>src/</code>.</div>}
                      labelPlacement="end"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={this.state.versionInPackage}
                          onChange={() => {
                            this.setState({ versionInPackage: !this.state.versionInPackage }, this.updatePythonCode);
                          }}
                        />
                      }
                      label={<div>Read <strong>version</strong> from package.</div>}
                      labelPlacement="end"
                    />
                    {versionField}
                    <FormControlLabel
                      control={
                        <Switch
                          checked={this.state.packageData}
                          onChange={() => {
                            this.setState({ packageData: !this.state.packageData }, this.updatePythonCode);
                          }}
                        />
                      }
                      label={<div>Include <strong>package data</strong>.</div>}
                      labelPlacement="end"
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={this.state.entrypoint}
                          onChange={() => {
                            this.setState({ entrypoint: !this.state.entrypoint }, this.updatePythonCode);
                          }}
                        />
                      }
                      label={<div>Add <strong>entrypoint</strong>.</div>}
                      labelPlacement="end"
                    />
                    <TextField
                      id="requirements"
                      label="Requirements"
                      multiline
                      defaultValue={this.state.requirements}
                      variant="outlined"
                      onChange={e => {
                        this.setState({ requirements: e.target.value || this.defaultValue }, this.updatePythonCode);
                      }}
                    />
                    <Autocomplete
                      multiple
                      id="classifiers"
                      options={pythonClassifiers}
                      defaultValue={this.state.classifiers}
                      filterSelectedOptions
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          label="Select classifiers"
                        />
                      )}
                      onChange={(_, v) => {
                        console.log(v);
                        this.setState({ classifiers: v || this.defaultValue }, this.updatePythonCode);
                      }}
                    />
                  </FormGroup>
                </Grid>
                <Grid item xs={12}>
                  <SyntaxHighlighter language="python" style={solarizedDark} className={this.props.classes.syntax}>{this.state.code}</SyntaxHighlighter>
                  <CopyToClipboard text={this.state.code}
                    onCopy={() => this.setState({ copied: true })}>
                    <Button variant="contained" color="primary">{(this.state.copied) ? "Copied!" : "Copy"}</Button>
                  </CopyToClipboard>
                </Grid>
              </Grid>
            </div>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

SetupPy.propTypes = {
  classes: PropTypes.object.isRequired,
};
