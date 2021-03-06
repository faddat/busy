let React = require('react'),
  numeral = require('numeral'),
  BodyShort = require('./body-short'),
  Link = require('react-router').Link;

module.exports = React.createClass({
  render() {
    const reply = this.props.reply;
    const payout = parseFloat(reply.total_payout_value) + parseFloat(reply.total_pending_payout_value);
    return (<li>
        <Link to={'/@' + reply.author}>@{reply.author}</Link> <b>{numeral(payout).format('$0,0.00')}</b> <BodyShort body={reply.body} />
      </li>);
  }
});
