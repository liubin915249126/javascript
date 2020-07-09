<ByButton onClick={() => {
        ByDialog.confirm({
          children: <PositionTakeProfit
            onFormChange={(order) => onTakeProfitChange(order)}
            position={{}}
          />,
          container: document.getElementById('test'),
        });
      }}
      >测试
      </ByButton>
      <div id="test" />