import React, { Component } from 'react';
import Pagination from '../../../store/reducers/InitialState/Pagination';
import _ from 'underscore';

class Paginator extends Component {
  static defaultProps = {
    onPageChange: (params) => {},
    default_class: '',
    page_limits: [
      25,
      50,
      100,
      200,
      500
    ],
    params: Pagination,
  }

  onPrev() {
    const { params, onPageChange } = this.props;
    let current_page = params.current_page || 1;
    if (current_page == 1) return;

    onPageChange({ current_page: current_page-1, per_page: params.per_page });
  }

  onNext() {
    const { params, onPageChange } = this.props;
    let current_page = params.current_page || 1;
    if (current_page > params.last_page) return;

    onPageChange({ current_page: current_page+1, per_page: params.per_page });
  }

  renderPageSelect() {
    const { params, onPageChange } = this.props;
    let last_page = params.last_page || 0;
    if (last_page > 0) {
      return (<select value={params.current_page || 1}
        title="Current Page"
        onChange={(e) => onPageChange({ current_page: parseInt(e.target.value), per_page: params.per_page })}>
        {_.range(last_page).map(num => (<option value={num+1}>{num+1}</option>))}
      </select>);
    }
    return '';
  }

  renderPerPageSelect() {
    const { params, page_limits, onPageChange } = this.props;
    return (<select value={params.per_page || 25}
      title="Per Page"
      onChange={(e) => onPageChange({ current_page: 1, per_page: parseInt(e.target.value)})}>
      {page_limits.map(pl => (<option value={pl}>{pl}</option>))}
    </select>);
  }

  render() {
    const { default_class, style } = this.props;

    return (<div className={`btn-group ${default_class}`} role="group" style={style}>
      <button className="btn btn-default" onClick={(e) => this.onPrev()} style={{fontWeight: 'bold'}}>Prev</button>
      <button className="btn btn-default" onClick={(e) => this.onNext()} style={{fontWeight: 'bold'}}>Next</button>
      <div className="form-inline">
        <div className="input-group">
          {this.renderPageSelect()}
          {this.renderPerPageSelect()}
        </div>
      </div>
    </div>);
  }
}

export default Paginator;
