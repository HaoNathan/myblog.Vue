<template>
  <Row type="flex" justify="center" align="middle">
    <Col
      :md="{span:5,offset:0,order:1}"
      :xs="{span:22,offset:0,order:2}"
      :style="{padding:'100px 0'}"
    >
      <Row>
        <Col :style="{backgroundColor:'lightgray',textAlign:'center',padding:'20px 0'}">
          <Avatar :src="photoUrl" size="100" />
          <H2>我的名字</H2>
        </Col>
      </Row>

      <Card :bordered="false" :style="{padding:'10% 0',backgroundColor:'lightgray'}">
        <CellGroup>
          <Cell title="Only show titles" />
          <Cell title="Display label content" label="label content" />
          <Cell title="Display right content" extra="details" />
          <Cell title="Link" extra="details" to="/components/button" />
          <Cell title="照片墙" to="/components/button" />
          <Cell title="留言墙" to="/components/button" target="_blank" />
          <Cell title="博客" to="/articleList">
            <Badge type="normal" :count="10" slot="extra" />
          </Cell>

          <Cell title="首页" to="/" />
        </CellGroup>
      </Card>
    </Col>
    <Col :md="{span:16,offset:1,order:2}" :xs="{span:22,offset:0,order:1}">
      <Card
        :bordered="false"
        :style="{backgroundColor:'lightgray',textAlign:'center',width:'100%',padding:'100px 0'}"
      >
        <H1>你好，朋友</H1>
        <P>测试文字</P>
        <p>测试文字</p>
        <p>测试文字</p>
        <p>测试文字</p>
        <p>测试文字</p>
        <p>测试文字</p>
        <p>测试文字</p>
        <p>测试文字</p>
        <p>测试文字</p>
        <p>测试文字</p>
        <p>测试文字</p>

        <p>测试文字</p>
        <p>测试文字</p>
        <p>测试文字</p>
        <p>测试文字</p>
      </Card>
    </Col>
  </Row>
</template>
<script>
export default {
  data: () => ({
    switchValue: false,
    photoUrl: require("../assets/backiee-169407.jpg"),
  }),
};
</script>
