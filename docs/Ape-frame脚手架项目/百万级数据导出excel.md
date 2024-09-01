# 百万级数据导出excel

> 场景：当存储的数据需要导出excel，尤其对于百万级别的数据非常客观

解决方法：用阿里提供的Util，其实就是一个抽象类，我们需要继承从而重写其中的几个方法即可测试

```java
package com.york.tool.excel;

import com.alibaba.excel.ExcelWriter;
import com.alibaba.excel.support.ExcelTypeEnum;
import com.alibaba.excel.write.metadata.WriteSheet;
import com.alibaba.excel.write.metadata.WriteTable;
import com.alibaba.excel.write.metadata.WriteWorkbook;
import com.york.tool.SpringContextUtils;
import lombok.extern.slf4j.Slf4j;

import javax.servlet.http.HttpServletResponse;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * 用阿里的easyExcel数据导出模板
 */
@Slf4j
public abstract class BaseEasyExcelExport<T> {

    /**
     * 导出到excel，支持大数量的分批写入
     */
    protected void exportExcel(String fileName, Map<String, Object> queryCondition) {
        HttpServletResponse response = SpringContextUtils.getHttpServletResponse();
        //根据条件查询总记录
        Long totalCount = dataTotalCount(queryCondition);
        //每一个Sheet存放的记录数
        Long sheetDataRows = eachSheetTotalCount();
        //每次写入的数据量
        Long writeDataRows = eachTimesWriteSheetTotalCount();
        if (totalCount < sheetDataRows) {
            sheetDataRows = totalCount;
        }
        if (sheetDataRows < writeDataRows) {
            writeDataRows = sheetDataRows;
        }
        doExport(response, fileName, queryCondition, totalCount, sheetDataRows, writeDataRows);
    }

    /**
     * 导出到excel
     */
    private void doExport(HttpServletResponse response, String fileName, Map<String, Object> queryCondition,
                          Long totalCount, Long sheetDataRows, Long writeDataRows) {
        OutputStream outputStream = null;
        try {
            outputStream = response.getOutputStream();
            WriteWorkbook writeWorkbook = new WriteWorkbook();
            writeWorkbook.setOutputStream(outputStream);
            writeWorkbook.setExcelType(ExcelTypeEnum.XLSX);
            ExcelWriter writer = new ExcelWriter(writeWorkbook);
            WriteTable table = new WriteTable();
            table.setHead(getExcelHead());
            // 计算需要的Sheet数量
            Long sheetNum = totalCount % sheetDataRows == 0 ? (totalCount / sheetDataRows) : (totalCount / sheetDataRows + 1);
            // 计算一般情况下每一个Sheet需要写入的次数
            Long oneSheetWriteCount = totalCount > sheetDataRows ? sheetDataRows / writeDataRows :
                    totalCount % writeDataRows > 0 ? totalCount / writeDataRows + 1 : totalCount / writeDataRows;
            // 计算最后一个sheet需要写入的次数
            Long lastSheetWriteCount = totalCount % sheetDataRows == 0 ? oneSheetWriteCount :
                    (totalCount % sheetDataRows % writeDataRows == 0 ? (totalCount / sheetDataRows / writeDataRows) :
                            (totalCount / sheetDataRows / writeDataRows + 1));
            // 分批查询分次写入
            List<List<String>> dataList = new ArrayList<>();
            for (int i = 0; i < sheetNum; i++) {
                WriteSheet sheet = new WriteSheet();
                sheet.setSheetNo(i);
                sheet.setSheetName(sheetNum == 1 ? fileName : fileName + i);
                for (int j = 0; j < (i != sheetNum - 1 || i == 0 ? oneSheetWriteCount : lastSheetWriteCount); j++) {
                    dataList.clear();
                    buildDataList(dataList, queryCondition, j + 1 + oneSheetWriteCount * i, writeDataRows);
                    writer.write(dataList, sheet, table);
                }
            }
            response.setHeader("Content-Disposition", "attachment;filename="
                    + new String((fileName).getBytes("gb2312"),
                    "ISO-8859-1") + ".xlsx");
            response.setContentType("application/vnd.ms-excel");
            response.setCharacterEncoding("utf-8");
            writer.finish();
            outputStream.flush();
        } catch (Exception e) {
            log.error("AbstractEasyExcelExport.exportWithBigData.error:{}", e.getMessage(), e);
        } finally {
            if (outputStream != null) {
                try {
                    outputStream.close();
                } catch (Exception e) {
                    log.error("AbstractEasyExcelExport.exportWithBigData.close.error:{}", e.getMessage(), e);
                }
            }
        }
    }

    /**
     * 获取导出的表头
     */
    protected abstract List<List<String>> getExcelHead();

    /**
     * 计算导出数据的总数
     */
    protected abstract Long dataTotalCount(Map<String, Object> conditions);

    /**
     * 每一个sheet存放的数据总数
     */
    protected abstract Long eachSheetTotalCount();

    /**
     * 每次写入sheet的总数
     */
    protected abstract Long eachTimesWriteSheetTotalCount();

    /**
     * 构建每次查询数量
     */
    protected abstract void buildDataList(List<List<String>> resultList, Map<String, Object> queryCondition,
                                          Long pageNo, Long pageSize);

}
```

下面是我们继承该抽象模板的子类

```java
package com.york.user.excel;

import com.york.page.PageResponse;
import com.york.tool.excel.BaseEasyExcelExport;
import com.york.user.entity.SysUser;
import com.york.user.entity.dto.PageSysUserDto;
import com.york.user.entity.po.SysUserPo;
import com.york.user.service.SysUserService;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.*;

/**
 * 模拟百万级数据输出导出到Excel中
 */
@Component
public class SysUserExcelExport extends BaseEasyExcelExport<SysUser> {

    @Resource
    private SysUserService sysUserService;

    /**
     * 数据导出
     */
    public void exportWithBigData(String fileName, Map<String, Object> conditions) {
        this.exportExcel(fileName, conditions);
    }

    @Override
    protected List<List<String>> getExcelHead() {
        List<List<String>> head = new ArrayList<>();
        head.add(Collections.singletonList("用户编号"));
        head.add(Collections.singletonList("用户姓名"));
        return head;
    }

    @Override
    protected Long dataTotalCount(Map<String, Object> conditions) {
        return sysUserService.queryCount(conditions);
    }

    @Override
    protected Long eachSheetTotalCount() {
        return 5000L;
    }

    @Override
    protected Long eachTimesWriteSheetTotalCount() {
        return 2000L;
    }

    @Override
    protected void buildDataList(List<List<String>> resultList, Map<String, Object> condition,
                                 Long pageNo, Long pageSize) {
        //可以根据condition设置条件
//      PageSysUserDtoConverter.INSTANCE.convertMapToDto(condition);
        PageSysUserDto pageSysUserDto = new PageSysUserDto();
        pageSysUserDto.setPageNo(pageNo);
        pageSysUserDto.setPageSize(pageSize);
        PageResponse<SysUserPo> sysUserPoPageResponse = sysUserService.queryByPage(pageSysUserDto);
        List<SysUserPo> sysUserPoResult = sysUserPoPageResponse.getResult();
        if (CollectionUtils.isNotEmpty(sysUserPoResult)) {
            sysUserPoResult.forEach(sysUserPo -> {
                resultList.add(Arrays.asList(sysUserPo.getId().toString(), sysUserPo.getName()));
            });
        }
    }

}
```

可以看到我们只需要在其中实现几个重要的方法

* `exportWithBigData(String fileName, Map<String, Object> conditions)`该方法确定==导出名==和==导出的条件==
*  `getExcelHead()` 该方法用于生成的excel表的列名
* `dataTotalCount(Map<String, Object> conditions)` 该方法用于用条件conditions去查到==总数==
* `eachSheetTotalCount()` 该方法用于设定每一个==sheet==的总数
* `eachTimesWriteSheetTotalCount()` 该方法用于写总共多少个sheet
* `buildDataList(List<List<String>> resultList, Map<String, Object> condition, Long pageNo, Long pageSize)` 该方法用于构建产生最后结果`List<List<String>> resultList`

这样我们就可以大胆的用一个controller去测试了

```java
package com.york.user.controller;

import com.york.user.excel.SysUserExcelExport;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.Map;

/**
 * 用户数据导出controller
 */
@Api(tags = "用户数据导出controller")
@RestController
@RequestMapping(value = "/sysUserExport")
@Slf4j
public class SysUserExportController {

    @Resource
    private SysUserExcelExport sysUserExcelExport;

    @ApiOperation(value = "导出excel", notes = "导出excel")
    @GetMapping("/exportData")
    public void exportData() {
        //指定数据条件
        Map<String, Object> map = new HashMap<>();
        sysUserExcelExport.exportWithBigData("用户列表", map);
    }
}
```

结果还是很Amazing呀

![](./../%E6%AF%8F%E6%97%A5%E5%AE%8C%E6%88%90%E8%AE%A1%E5%88%92%E6%88%AA%E5%9B%BE/xxl-job/%E6%95%B0%E6%8D%AEexcel%E5%AF%BC%E5%87%BA%E7%BB%93%E6%9E%9C.jpg)
